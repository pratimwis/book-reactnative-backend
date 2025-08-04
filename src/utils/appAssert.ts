
import assert from "node:assert";
import AppError from "./appError";
import { HttpStatusCode } from "../constant/http";
import AppErrorCode from "../constant//appErrorCode";

// Define the correct function type
type AppAssert = (
  condition: unknown,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, httpStatusCode, message, appErrorCode) => {
  // Ensure condition is treated as a boolean and assert accordingly
  assert(!Boolean(condition), new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;