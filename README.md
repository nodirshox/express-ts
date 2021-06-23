# expres-ts
Express TS

Additions/improvements/changes made:
1. Global middleware for handling errors
2. Implement consistent response formatting with the `ApiResponse` and `ApiError` classes
3. Refactor Express routes.
4. Use `tryAsync()` to avoid nested try/catch
5. Validations separated from controllers, used Joi
6. `async.parallel()` replaced by `Promise.all()`
7. DB connection refactored