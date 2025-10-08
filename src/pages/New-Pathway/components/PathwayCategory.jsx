import { Combobox, ComboboxInput } from "@headlessui/react";
import { X as XIcon, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";

ReactModal.setAppElement("#root");

const PathwayCategory = ({ name, value, handleChange, isRequired, label }) => {
  // selectedItem now stores the category *text* (not id)
  const [selectedItem, setSelectedItem] = useState(value || null);
  const [openModal, setOpenModal] = useState(false);

  const [items, setItems] = useState([]); // flat list {id, parent, text}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // track which nodes are expanded (works for any depth)
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          "https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/PW_category",
          { signal: controller.signal, timeout: 15000 }
        );

        const json = res?.data;

        if (Array.isArray(json)) {
          setItems(json);
          setLoading(false);
          return;
        }

        const list = json?.list ?? json;
        if (list && list.results && Array.isArray(list.results.bindings)) {
          const mapped = list.results.bindings.map((row) => {
            let parent;
            if (row.child_id_name && row.child_id_name.value === "pathway") {
              parent = "#";
            } else if (row.child_id && row.child_id.value) {
              parent = row.child_id.value.replace(
                "http://purl.obolibrary.org/obo/",
                ""
              );
            } else {
              parent = "#";
            }

            return {
              id: row.real_child_id.value.replace(
                "http://purl.obolibrary.org/obo/",
                ""
              ),
              parent,
              text: row.real_child_name.value,
            };
          });
          setItems(mapped);
          setLoading(false);
          return;
        }

        // fallback: try to find first array payload
        const candidate = Object.values(json).find((v) => Array.isArray(v));
        if (candidate) {
          setItems(candidate);
          setLoading(false);
          return;
        }

        throw new Error("Unexpected response shape");
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          // request was cancelled — do nothing
          return;
        }
        setError(err.message || "Fetch error");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // Accept incoming `value` as either text or id. When items load we normalize to text.
  useEffect(() => {
    if (!value) {
      setSelectedItem(null);
      return;
    }

    // If value exactly matches an item's text -> keep it
    const byText = items.find((it) => it.text === value);
    if (byText) {
      setSelectedItem(byText.text);
      return;
    }

    // If value looks like an id (matches item.id) -> convert to text
    const byId = items.find((it) => it.id === value);
    if (byId) {
      setSelectedItem(byId.text);
      return;
    }

    // Otherwise accept the value as-is (tolerant)
    setSelectedItem(value);
  }, [value, items]);

  // build map -> children list for arbitrary depth
  const treeMap = useMemo(() => {
    const map = {};
    const childrenMap = {};

    items.forEach((it) => {
      map[it.id] = { ...it };
      if (!childrenMap[it.id]) childrenMap[it.id] = [];
    });

    items.forEach((it) => {
      const parentId =
        it.parent === "#" || it.parent === null ? "#" : it.parent;
      if (!childrenMap[it.id]) childrenMap[it.id] = childrenMap[it.id] || [];
      if (parentId !== "#") {
        if (!childrenMap[parentId]) childrenMap[parentId] = [];
        childrenMap[parentId].push(it);
      }
    });

    const roots = items.filter(
      (it) => it.parent === "#" || it.parent === null || !map[it.parent]
    );

    return { map, childrenMap, roots };
  }, [items]);

  const handleToggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  // notify parent with an event-like object, but send *text* as value
  const notifyParent = (textVal) => {
    if (typeof handleChange === "function") {
      handleChange({ target: { name: name || "category", value: textVal } });
    }
  };

  // when a node is selected, we store and send the node.text (not id)
  const onSelectNode = (node) => {
    setSelectedItem(node.text);
    notifyParent(node.text);
    setOpenModal(false); // close modal immediately on select
  };

  const handleClearCategory = () => {
    setSelectedItem(null);
    // send empty string so the parent receives a consistent "no-value" text
    notifyParent("");
  };

  // search: keep nodes that match text or have matching descendants
  const filteredRoots = useMemo(() => {
    if (!query.trim()) return treeMap.roots;
    const q = query.trim().toLowerCase();

    const matches = new Set();

    // mark nodes that match
    items.forEach((it) => {
      if (it.text && it.text.toLowerCase().includes(q)) matches.add(it.id);
    });

    if (matches.size === 0) return [];

    // include ancestors as well
    const toInclude = new Set();
    const parentLookup = {};
    items.forEach((it) => (parentLookup[it.id] = it.parent));

    matches.forEach((id) => {
      let cur = id;
      toInclude.add(cur);
      while (parentLookup[cur] && parentLookup[cur] !== "#") {
        cur = parentLookup[cur];
        toInclude.add(cur);
      }
    });

    return treeMap.roots.filter(
      (r) => toInclude.has(r.id) || (r.text && r.text.toLowerCase().includes(q))
    );
  }, [query, items, treeMap.roots]);

  // Recursive renderer: node can have children (which can themselves have children)
  const TreeNode = ({ node, depth = 0 }) => {
    const children = treeMap.childrenMap[node.id] || [];
    const isExpanded = !!expanded[node.id];

    return (
      <div key={node.id} className="border-b last:border-b-0">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            {children.length > 0 ? (
              <button
                type="button"
                onClick={() => handleToggle(node.id)}
                className="rounded p-1 hover:bg-gray-100 focus:outline-none"
                aria-expanded={isExpanded}
                style={{ marginLeft: depth * 12 }}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            ) : (
              <div style={{ width: 36, marginLeft: depth * 12 }} />
            )}

            <div>
              <div className="text-sm font-medium text-gray-800">
                {node.text}
              </div>
              <div className="text-xs text-gray-400">{node.id}</div>
            </div>
          </div>

          <div>
            {/* improved select button styling, closes modal on click */}
            <button
              type="button"
              onClick={() => onSelectNode(node)}
              className="text-sm px-3 py-1 rounded-md bg-[#57369E] text-white hover:bg-[#48277f] transition-all duration-150"
              aria-label={`Select ${node.text}`}
            >
              Select
            </button>
          </div>
        </div>

        {children.length > 0 && isExpanded && (
          <div className="bg-gray-50">
            {children.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const rootsToRender = query.trim() ? filteredRoots : treeMap.roots;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {isRequired && <span className="text-red-500">*</span>}
        <span>{label}</span>
      </label>

      <div className="relative w-full mt-1">
        <div className="relative flex justify-between items-center">
          <Combobox
            value={selectedItem}
            name={name}
            onChange={(v) => {
              // kept for completeness: notify parent if Combobox changes
              setSelectedItem(v);
              notifyParent(v);
            }}
          >
            <div className="flex w-[75%] relative">
              <ComboboxInput
                aria-label={name || "Item"}
                displayValue={(text) => text || ""}
                className="h-[40px] mt-1 block w-full rounded-md border border-gray-300 pl-2 pr-10 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none"
                placeholder={"Please click on open modal to select category"}
                disabled={true}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                {selectedItem && (
                  <button
                    type="button"
                    onClick={handleClearCategory}
                    className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none text-sm"
                    aria-label="Clear selection"
                  >
                    <XIcon size={16} />
                  </button>
                )}
              </div>
            </div>
          </Combobox>

          <div>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="px-6 py-2 rounded-sm text-white font-semibold transition-all bg-[#57369E] hover:bg-[#00A7D3]"
            >
              Open Modal
            </button>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className="mx-4 w-[50%] max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-xl outline-none p-0"
        closeTimeoutMS={160}
      >
        <div className="flex flex-col max-h-[80vh]">
          <header className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Pathway Category
            </h3>
            <button
              aria-label="Close modal"
              onClick={() => setOpenModal(false)}
              className="rounded-md p-2 hover:bg-gray-100 focus:outline-none"
            >
              <XIcon size={18} />
            </button>
          </header>

          <div className="px-4 py-3">
            <div className="mb-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#57369E]"
              />
            </div>

            <div className="max-h-[50vh] overflow-auto border rounded-md">
              {loading && (
                <div className="p-4 text-sm text-gray-600">Loading...</div>
              )}
              {error && (
                <div className="p-4 text-sm text-red-600">Error: {error}</div>
              )}

              {!loading && !error && items.length === 0 && (
                <div className="p-4 text-sm text-gray-600">
                  No categories found.
                </div>
              )}

              {!loading && !error && items.length > 0 && (
                <div>
                  {(rootsToRender || []).map((r) => (
                    <TreeNode key={r.id} node={r} />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default PathwayCategory;
