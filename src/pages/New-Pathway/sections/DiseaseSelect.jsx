import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const DiseaseSelect = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selectedPerson}
      onChange={setSelectedPerson}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          aria-label="Assignee"
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
          className="h-[40px] mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none focus:ring-opacity-50 hover:border-gray-400 text-gray-900 placeholder-gray-400"
          placeholder="Search for a person..."
        />
        <ComboboxOptions
          anchor="bottom"
          className="w-[20%] absolute z-10 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg empty:invisible"
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-pointer items-center gap-3 p-3 text-gray-900 transition-colors duration-150 data-[focus]:bg-[#57369E] data-[focus]:text-white"
            >
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-gray-400 group-data-[selected]:text-[#57369E] group-data-[focus]:text-white group-data-[selected]:group-data-[focus]:text-white" />
              <span className="truncate">{person.name}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default DiseaseSelect;
