import { Router } from "express";
import { ResourceService } from "../services/resourceService";

const router = Router();
const resourceService = new ResourceService();

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.post("/", async (req, res) => {
  const resource = await resourceService.createResource(req.body);
  res.json(resource);
});

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: List all resources
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter resources by status
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get("/", async (req, res) => {
  const { status } = req.query;
  const resources = await resourceService.getResources({
    status: status as string,
  });
  res.json(resources);
});

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resource details
 */
router.get("/:id", async (req, res) => {
  const resource = await resourceService.getResourceById(Number(req.params.id));
  res.json(resource);
});

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource updated successfully
 */
router.put("/:id", async (req, res) => {
  const resource = await resourceService.updateResource(
    Number(req.params.id),
    req.body
  );
  res.json(resource);
});

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 */
router.delete("/:id", async (req, res) => {
  await resourceService.deleteResource(Number(req.params.id));
  res.status(204).send();
});

export default router;
