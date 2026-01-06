import { http } from "../http";

type ErrorType = "ERROR" | "INFO" | "WARN" | "LOG";

const sendLogToServer = async (type: ErrorType, message: string, content: string) => {
  const logEntry = {
    type,
    message,
    content,
    timestamp: new Date().toISOString(),
  };

  try {
    await http.post("/logs", logEntry);
  } catch (error) {
    console.error("Failed to send logs to server", error);
  }
};

const formatData = (type: ErrorType, ...args: any[]): string => {
  const timestamp = new Date().toISOString();
  let content: string;
  if (args.length === 1) {
    content = typeof args[0] === "string" ? args[0] : JSON.stringify(args[0], null, 3);
  } else {
    const [message, data] = args;
    content =
      typeof message === "string"
        ? `${message} ${data ? JSON.stringify(data, null, 3) : ""}`
        : JSON.stringify(message, null, 3);
  }
  return `[${timestamp}] [${type}]: ${content}`;
};

const logMethod = async (type: ErrorType, ...args: any[]): Promise<void> => {
  if (process.env.NODE_ENV === "development") {
    console.log(formatData(type, ...args));
  }

  if (process.env.NODE_ENV === "production" && type !== "LOG") {
    try {
      let message: string;
      let content: string;

      if (args.length === 0) {
        // nothing passed
        message = "";
        content = "";
      } else if (args.length === 1) {
        // logger.log("Message") OR logger.log(obj)
        if (typeof args[0] === "string") {
          message = args[0];
          content = args[0]; // fall back to message
        } else {
          const json = JSON.stringify(args[0]);
          message = json; // or some default like 'Log'
          content = json;
        }
      } else {
        const [msg, data] = args;
        message = typeof msg === "string" ? msg : JSON.stringify(msg);
        content = JSON.stringify(data);
      }

      await sendLogToServer(type, message, content);
    } catch {
      console.error(`Failed to send ${type.toLowerCase()} logs to server`);
    }
  }
};

export const logger = {
  error: (...args: any[]) => logMethod("ERROR", ...args),
  info: (...args: any[]) => logMethod("INFO", ...args),
  warn: (...args: any[]) => logMethod("WARN", ...args),
  log: (...args: any[]) => logMethod("LOG", ...args),
};
