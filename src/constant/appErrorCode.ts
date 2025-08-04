const enum AppErrorCode {
    // Authentication and Token Errors
    InvalidAccessToken = "INVALID_ACCESS_TOKEN",
    InvalidToken = "INVALID_TOKEN",
    SessionNotFound = "SESSION_NOT_FOUND",
    SessionNotDestroyed = "SESSION_NOT_DESTROYED",
    NoAccessToken = "NO_ACCESS_TOKEN",
    NoTokenProvided = "NO_TOKEN_PROVIDED",
    Unauthorized = "UNAUTHORIZED",
    MissingRole = "MISSING_ROLE",
    EmailRequired = "EMAIL_REQUIRED",
    PasswordRequired = "PASSWORD_REQUIRED",
    ConfirmPasswordRequired = "CONFIRM_PASSWORD_REQUIRED",
    TokenRequired = "TOKEN_REQUIRED",
    CurrentPasswordRequired = "CURRENT_PASSWORD_REQUIRED",
    NewPasswordRequired = "NEW_PASSWORD_REQUIRED",
    ConfirmNewPasswordRequired = "CONFIRM_NEW_PASSWORD_REQUIRED",
    IncorrectCurrentPassword = "INCORRECT_CURRENT_PASSWORD",
   

    // Registration and User Management Errors
    AdminAlreadyExists = "ADMIN_ALREADY_EXISTS",
    EmailAlreadyExists = "EMAIL_ALREADY_EXISTS",
    InvalidRole = "INVALID_ROLE",
    PasswordMismatch = "PASSWORD_MISMATCH",
    AccessDenied = "ACCESS_DENIED",
    UserIdRequired = "USER_ID_REQUIRED",
    UserNotFound = "USER_NOT_FOUND",
    InvalidEmail = "INVALID_EMAIL",
    UserAlreadyExists = "USER_ALREADY_EXISTS",

    // Login Errors
    RoleRequired = "ROLE_REQUIRED",
    InvalidPassword = "INVALID_PASSWORD",
    InvalidSession = "INVALID_SESSION",


    // 2FA (Two-Factor Authentication) Errors
    TwoFARequired = "TWO_FA_REQUIRED",
    TwoFASetup = "TWO_FA_SETUP",
    TwoFAVerificationFailed = "TWO_FA_VERIFICATION_FAILED",
    Invalid2FAToken = "INVALID_2FA_TOKEN",

     // Blog CRUD Errors
     BlogNotFound = "BLOG_NOT_FOUND",
     BlogDeleteFailed = "BLOG_DELETE_FAILED",
     BlogValidationFailed = "BLOG_VALIDATION_FAILED",
     BlogContentRequired = "BLOG_CONTENT_REQUIRED",
     BlogsNotFound = "NO_BLOGS_FOUND",

     //Contact Errors
     ContactQueriesNotFound = "CONTACT_QUERIES_NOT_FOUND",
     InvalidQueryId = "INVALID_QUERY-ID",
     ReplyMessageRequired = "REPLY_MESSAGE_REQUIRED",

     //otcErrors
     OtcDeskEntryNotFound = "OTCDESK_ENTRY_NOT_FOUND",
     InvalidEnquiryId = "INVALID_QUERY-ID",
     MessageRequired = "REPLY_MESSAGE_REQUIRED",

    // General Success Code
    Success = "SUCCESS",
    MissingField = "MISSING_FIELD",
    
    //Upload file errors
    UploadFailed = "UPLOAD_FAILED",
    // Book related errors
    BookNotFound = "BOOK_NOT_FOUND",
}

export default AppErrorCode;