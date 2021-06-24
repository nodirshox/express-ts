# expres-ts
Express TS

Additions/improvements/changes made:
1. Controller made class based
2. Implemented Dependency Injection(DI). See usage of `reflect-metadata` and `tsyringe` and of services.
3. Global middleware for handling errors
4. Implement consistent response formatting with the `ApiResponse` and `ApiError` classes
5. Refactor Express routes.
6. Use `tryAsync()` to avoid nested try/catch
7. Validations separated from controllers, used Joi
8. `async.parallel()` replaced by `Promise.all()`
9. DB connection refactored