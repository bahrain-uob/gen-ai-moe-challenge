import { MouseEventHandler } from 'react';
import { BsQuestionLg } from 'react-icons/bs';

type ModalProps = {
  isOpen: boolean;
  onCancel: MouseEventHandler;
  modalMessage: string;
};

/*
 * Adapted from https://tailwindui.com/components/application-ui/overlays/dialogs
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCancel,
  modalMessage,
}) => {
  const backdropStyle = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible';
  const modalContainerStyle = isOpen
    ? 'opacity-100 visible'
    : 'opacity-0 invisible';
  const modalPanelStyle = isOpen
    ? 'opacity-100 translate-y-0 sm:scale-100'
    : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95';

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-50 transition-all ${backdropStyle}`}
      ></div>

      <div
        className={`fixed inset-0 w-screen overflow-y-auto transition-all ${modalContainerStyle}`}
      >
        <div
          className={`flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0`}
          onClick={onCancel}
        >
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg ${modalPanelStyle}`}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                  <BsQuestionLg className="text-sky-600" size={18} />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Instructions
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {modalMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onCancel}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
