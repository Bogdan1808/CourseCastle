/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Licenta_CourseCastle_frontend_web_app_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Licenta\\\\CourseCastle\\\\frontend\\\\web-app\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Licenta_CourseCastle_frontend_web_app_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDTGljZW50YSU1Q0NvdXJzZUNhc3RsZSU1Q2Zyb250ZW5kJTVDd2ViLWFwcCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q0xpY2VudGElNUNDb3Vyc2VDYXN0bGUlNUNmcm9udGVuZCU1Q3dlYi1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FDO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxMaWNlbnRhXFxcXENvdXJzZUNhc3RsZVxcXFxmcm9udGVuZFxcXFx3ZWItYXBwXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXExpY2VudGFcXFxcQ291cnNlQ2FzdGxlXFxcXGZyb250ZW5kXFxcXHdlYi1hcHBcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\nconst { GET, POST } = _auth__WEBPACK_IMPORTED_MODULE_0__.handlers;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBaUM7QUFDMUIsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRSxHQUFHRiwyQ0FBUUEsQ0FBQSIsInNvdXJjZXMiOlsiQzpcXExpY2VudGFcXENvdXJzZUNhc3RsZVxcZnJvbnRlbmRcXHdlYi1hcHBcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVycyB9IGZyb20gXCJAL2F1dGhcIlxyXG5leHBvcnQgY29uc3QgeyBHRVQsIFBPU1QgfSA9IGhhbmRsZXJzIl0sIm5hbWVzIjpbImhhbmRsZXJzIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   handlers: () => (/* binding */ handlers),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth_providers_duende_identity_server6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/duende-identity-server6 */ \"(rsc)/./node_modules/next-auth/providers/duende-identity-server6.js\");\n\n\nconst { handlers, signIn, signOut, auth } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    providers: [\n        (0,next_auth_providers_duende_identity_server6__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            id: 'id-server',\n            clientId: \"nextApp\",\n            clientSecret: \"secret\",\n            issuer: \"http://localhost:5000\",\n            authorization: {\n                url: \"http://localhost:5000/connect/authorize\",\n                params: {\n                    scope: 'openid profile courseApp'\n                }\n            },\n            token: \"http://localhost:5000/connect/token\",\n            userinfo: \"http://localhost:5000/connect/userinfo\",\n            idToken: false\n        })\n    ],\n    callbacks: {\n        async authorized ({ auth }) {\n            return !!auth;\n        },\n        async jwt ({ token, profile, account }) {\n            if (account && account.access_token) {\n                token.accessToken = account.access_token;\n            }\n            if (profile) {\n                token.username = profile.username;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.username = token.username;\n                session.accessToken = token.accessToken;\n            }\n            return session;\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2QztBQUUrQjtBQUVyRSxNQUFNLEVBQUVFLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLElBQUksRUFBRSxHQUFHTCxxREFBUUEsQ0FBQztJQUMxRE0sV0FBVztRQUNMTCx1RkFBa0JBLENBQUM7WUFDZk0sSUFBSTtZQUNKQyxVQUFVO1lBQ1ZDLGNBQWM7WUFDZEMsUUFBUTtZQUNSQyxlQUFlO2dCQUNiQyxLQUFLO2dCQUNMQyxRQUFRO29CQUFDQyxPQUFPO2dCQUEwQjtZQUM1QztZQUNBQyxPQUFPO1lBQ1BDLFVBQVU7WUFDVkMsU0FBUztRQUNqQjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxZQUFXLEVBQUVkLElBQUksRUFBRTtZQUN2QixPQUFPLENBQUMsQ0FBQ0E7UUFDWDtRQUNBLE1BQU1lLEtBQUksRUFBRUwsS0FBSyxFQUFFTSxPQUFPLEVBQUVDLE9BQU8sRUFBRTtZQUNuQyxJQUFHQSxXQUFXQSxRQUFRQyxZQUFZLEVBQUU7Z0JBQ2xDUixNQUFNUyxXQUFXLEdBQUdGLFFBQVFDLFlBQVk7WUFDMUM7WUFDRSxJQUFHRixTQUFTO2dCQUNWTixNQUFNVSxRQUFRLEdBQUdKLFFBQVFJLFFBQVE7WUFDbkM7WUFDQSxPQUFPVjtRQUNYO1FBQ0EsTUFBTVcsU0FBUSxFQUFFQSxPQUFPLEVBQUVYLEtBQUssRUFBRTtZQUM1QixJQUFHQSxPQUFPO2dCQUNSVyxRQUFRQyxJQUFJLENBQUNGLFFBQVEsR0FBR1YsTUFBTVUsUUFBUTtnQkFDdENDLFFBQVFGLFdBQVcsR0FBR1QsTUFBTVMsV0FBVztZQUN6QztZQUNBLE9BQU9FO1FBQ1g7SUFDRjtBQUNGLEdBQUUiLCJzb3VyY2VzIjpbIkM6XFxMaWNlbnRhXFxDb3Vyc2VDYXN0bGVcXGZyb250ZW5kXFx3ZWItYXBwXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyBQcm9maWxlIH0gZnJvbSBcIm5leHQtYXV0aFwiXHJcbmltcG9ydCB7IE9JRENDb25maWcgfSBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVyc1wiXHJcbmltcG9ydCBEdWVuZGVJRFM2UHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZHVlbmRlLWlkZW50aXR5LXNlcnZlcjZcIlxyXG4gXHJcbmV4cG9ydCBjb25zdCB7IGhhbmRsZXJzLCBzaWduSW4sIHNpZ25PdXQsIGF1dGggfSA9IE5leHRBdXRoKHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgICAgICBEdWVuZGVJRFM2UHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBpZDogJ2lkLXNlcnZlcicsXHJcbiAgICAgICAgICAgIGNsaWVudElkOiBcIm5leHRBcHBcIixcclxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBcInNlY3JldFwiLFxyXG4gICAgICAgICAgICBpc3N1ZXI6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCIsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHtcclxuICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2Nvbm5lY3QvYXV0aG9yaXplXCIsXHJcbiAgICAgICAgICAgICAgcGFyYW1zOiB7c2NvcGU6ICdvcGVuaWQgcHJvZmlsZSBjb3Vyc2VBcHAnfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b2tlbjogXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvY29ubmVjdC90b2tlblwiLFxyXG4gICAgICAgICAgICB1c2VyaW5mbzogXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvY29ubmVjdC91c2VyaW5mb1wiLFxyXG4gICAgICAgICAgICBpZFRva2VuOiBmYWxzZVxyXG4gICAgfSBhcyBPSURDQ29uZmlnPE9taXQ8UHJvZmlsZSwgJ3VyZW5hbWUnPj4pLFxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBhdXRob3JpemVkKHsgYXV0aCB9KXtcclxuICAgICAgcmV0dXJuICEhYXV0aFxyXG4gICAgfSxcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCBwcm9maWxlLCBhY2NvdW50IH0pIHtcclxuICAgICAgaWYoYWNjb3VudCAmJiBhY2NvdW50LmFjY2Vzc190b2tlbikge1xyXG4gICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW5cclxuICAgICAgfVxyXG4gICAgICAgIGlmKHByb2ZpbGUpIHtcclxuICAgICAgICAgIHRva2VuLnVzZXJuYW1lID0gcHJvZmlsZS51c2VybmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICBpZih0b2tlbikge1xyXG4gICAgICAgICAgc2Vzc2lvbi51c2VyLnVzZXJuYW1lID0gdG9rZW4udXNlcm5hbWVcclxuICAgICAgICAgIHNlc3Npb24uYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NUb2tlblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9XHJcbn0pIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiRHVlbmRlSURTNlByb3ZpZGVyIiwiaGFuZGxlcnMiLCJzaWduSW4iLCJzaWduT3V0IiwiYXV0aCIsInByb3ZpZGVycyIsImlkIiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJpc3N1ZXIiLCJhdXRob3JpemF0aW9uIiwidXJsIiwicGFyYW1zIiwic2NvcGUiLCJ0b2tlbiIsInVzZXJpbmZvIiwiaWRUb2tlbiIsImNhbGxiYWNrcyIsImF1dGhvcml6ZWQiLCJqd3QiLCJwcm9maWxlIiwiYWNjb3VudCIsImFjY2Vzc190b2tlbiIsImFjY2Vzc1Rva2VuIiwidXNlcm5hbWUiLCJzZXNzaW9uIiwidXNlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@auth","vendor-chunks/oauth4webapi","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLicenta%5CCourseCastle%5Cfrontend%5Cweb-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();