import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    customClass: {
        popup: "custom-toast",
    },
    didOpen: (toast) => {
        const closeBtn = toast.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => Swal.close());
        }
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});



export const ShowToast = (title, message) => {
    Toast.fire({
        title: `<div class='flex justify-between items-center'><span>${title}</span><button class="close-btn text-xl font-bold inline"><img src="/images/icons/close.svg" class="close-btn" /></button></div>`,
        html: `<p class="text-sm text-gray-600">${message}</p>`,
    });
};


