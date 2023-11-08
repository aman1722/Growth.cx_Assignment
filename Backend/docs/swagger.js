/*-----------> Schemas <--------------*/

/* ---------------------> Authorization Schema <---------------------*/
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/







/* ---------------------> Routes <---------------------*/

/* ---------------------> Home Routes <---------------------*/
/**
 * @swagger
 * paths:
 *   /:
 *     get:
 *       summary: Welcome message
 *       description: Returns a welcome message for the Growth.cx word count app backend.
 *       tags: [Home]
 *       responses:
 *         200:
 *           description: Welcome message retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   message: Welcome to Growth.cx word count app backend.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   error:
 *                     type: string
 *                 example:
 *                   ok: false
 *                   error: Internal server error.
 */