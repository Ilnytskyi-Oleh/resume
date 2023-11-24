export const Loader = () => (
  <>
    <div className="absolute -inset-2 flex items-center justify-center rounded-xl bg-gray-100 opacity-80">
      <div className="flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-b-0 border-l-0 border-green-400 p-2">
        <div className="animate-spin-rev h-full w-full rounded-full border-4 border-r-0 border-t-0 border-amber-400 "></div>
      </div>
    </div>

    <style jsx>
      {`
        .animate-spin-rev {
          animation: spin-rev 0.5s linear infinite;
        }

        @keyframes spin-rev {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}
    </style>
  </>
);
