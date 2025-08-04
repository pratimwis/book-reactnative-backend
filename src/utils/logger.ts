import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info", // Log level (e.g., 'info', 'warn', 'error')
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Logs to the console
        new transports.File({ filename: "app.log" }) // Logs to a file
    ],
});

export default logger;