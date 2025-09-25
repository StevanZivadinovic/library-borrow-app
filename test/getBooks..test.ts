
// // Import jest globals for type recognition in TypeScript
// import { jest } from '@jest/globals';

// import { fetchBooks } from "@/lib/actions/getBooks";
// import { ReactNode } from "react";
// import { Action, ExternalToast, toast, ToastClassnames, ToastT, ToastToDismiss } from "sonner";

// jest.mock("sonner", () => ({
//   toast: jest.fn(),
// }));

// describe("fetchBooks", () => {
//   let mockSetBooks: jest.Mock;

//   beforeEach(() => {
//     mockSetBooks = jest.fn();
//     jest.clearAllMocks();
//   });

//   it("uspešno setuje books data kad API vrati ok", async () => {
//     const fakeBooks: BookType[] = [
//       { id: 1, title: "Book 1" },
//       { id: 2, title: "Book 2" },
//     ];

//     // Mock fetch
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(fakeBooks),
//       } as Response)
//     ) as jest.Mock;

//     await fetchBooks(mockSetBooks);

//     expect(mockSetBooks).toHaveBeenCalledWith(fakeBooks);
//     expect(toast).not.toHaveBeenCalled();
//   });

//   it("poziva toast kad fetch failuje", async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: false,
//       } as Response)
//     ) as jest.Mock;

//     await fetchBooks(mockSetBooks);

//     expect(mockSetBooks).not.toHaveBeenCalled();
//     expect(toast).toHaveBeenCalledWith(
//       "Failed to load books. Please try again."
//     );
//   });

//   it("poziva toast ako fetch baci error", async () => {
//     global.fetch = jest.fn(() => Promise.reject("Network error")) as jest.Mock;

//     await fetchBooks(mockSetBooks);

//     expect(mockSetBooks).not.toHaveBeenCalled();
//     expect(toast).toHaveBeenCalledWith(
//       "Failed to load books. Please try again."
//     );
//   });
// });
// function expect(toast: ((message: (() => React.ReactNode) | ReactNode, data?: ExternalToast) => string | number) & { success: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; info: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; warning: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; error: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => string | number; message: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; promise: <ToastData>(promise: Promise<ToastData> | (() => Promise<ToastData>), data?: { id?: number | string | undefined; icon?: ReactNode; richColors?: boolean | undefined; invert?: boolean | undefined; closeButton?: boolean | undefined; dismissible?: boolean | undefined; duration?: number | undefined; action?: ReactNode | Action; cancel?: ReactNode | Action; onDismiss?: ((toast: ToastT) => void) | undefined; onAutoClose?: ((toast: ToastT) => void) | undefined; cancelButtonStyle?: React.CSSProperties | undefined; actionButtonStyle?: React.CSSProperties | undefined; style?: React.CSSProperties | undefined; unstyled?: boolean | undefined; className?: string | undefined; classNames?: ToastClassnames | undefined; descriptionClassName?: string | undefined; position?: ("top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center") | undefined; } & { loading?: string | React.ReactNode; success?: (ReactNode | ((data: ToastData) => React.ReactNode | string | Promise<React.ReactNode | string>)) | (PromiseIExtendedResult | ((data: ToastData) => PromiseIExtendedResult | Promise<PromiseIExtendedResult>)); error?: (ReactNode | ((data: any) => React.ReactNode | string | Promise<React.ReactNode | string>)) | (PromiseIExtendedResult | ((data: any) => PromiseIExtendedResult | Promise<PromiseIExtendedResult>)); description?: ReactNode | ((data: any) => React.ReactNode | string | Promise<React.ReactNode | string>); finally?: () => void | Promise<void>; }) => (string & { unwrap: () => Promise<ToastData>; }) | (number & { unwrap: () => Promise<ToastData>; }) | { unwrap: () => Promise<ToastData>; }; dismiss: (id?: number | string) => string | number; loading: (message: ((() => React.ReactNode) | ReactNode) | React.ReactNode, data?: ExternalToast) => string | number; } & { getHistory: () => (ToastT | ToastToDismiss)[]; getToasts: () => (ToastT | ToastToDismiss)[]; }) {
//     throw new Error("Function not implemented.");
// }

