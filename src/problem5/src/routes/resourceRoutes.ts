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
 *       404:
 *         description: Resource not found
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
 *       404:
 *         description: Resource not found
 */
router.get("/:id", async (req, res) => {
  try {
    const resource = await resourceService.getResourceById(
      Number(req.params.id)
    );
    res.json(resource);
  } catch (error) {
    res.status(404).json({ message: "Resource not found" });
  }
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
 *       404:
 *         description: Resource not found
 */
router.put("/:id", async (req, res) => {
  try {
    const resource = await resourceService.updateResource(
      Number(req.params.id),
      req.body
    );
    res.json(resource);
  } catch (error) {
    res.status(404).json({ message: "Resource not found" });
  }
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
 *       404:
 *         description: Resource not found
 */
router.delete("/:id", async (req, res) => {
  try {
    await resourceService.deleteResource(Number(req.params.id));
    res.status(204).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Resource not found" });
  }
});

export default router;
