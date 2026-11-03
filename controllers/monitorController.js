import fileService from "../middleware/fileService.js";
import Monitor from "../models/Monitor.js";

class MonitorController {
  async getMonitors(req, res) {
    try {
      const monitors = await Monitor.find();
      res.status(200).json(monitors);
    } catch (err) {
      res.status(401).json(`Ошибка при получении мониторов: ${err}`);
    }
  }

  async getMonitor(req, res) {
    try {
      const { id } = req.params;
      const monitor = await Monitor.findById(id);

      if (!monitor) {
        res.status(404).json(" Монитор с таким ID отсутствует в БД!");
      }
      res.status(200).json(monitor);
    } catch (err) {
      res.status(500).json(`Ошибка при получении монитора: ${err}`);
    }
  }

  async addMonitor(req, res) {
    try {
      let fileName = null;

      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
      }

      const { title, model, size, price } = req.body;
      const newMonitor = await Monitor.create({
        title,
        model,
        size,
        price,
        image: fileName,
      });

      res.status(200).json(newMonitor);
      newMonitor.save();
    } catch (err) {
      res.status(500).json(`Ошибка при добавлении монитора: ${err}`);
      console.error(`Ошибка при добавлении монитора: ${err}`);
    }
  }

  async updateMonitor(req, res) {
    try {
      const { id } = req.params;
      const { title, model, size, price } = req.body;
      const updateMonitor = await Monitor.findByIdAndUpdate(
        id,
        {
          title,
          model,
          size,
          price,
        },
        { new: true }
      );

      if (!updateMonitor) {
        res.status(404).json("Монитор с таким ID отсутствует в БД!");
      }

      res.status(200).json(updateMonitor);
    } catch (err) {
      res.status(500).json(`Ошибка при обновлении Монитора: ${err}`);
    }
  }

  async deleteMonitor(req, res) {
    try {
      const { id } = req.params;
      const deleteMonitor = await Monitor.findByIdAndDelete(id);

      if (!deleteMonitor) {
        res.status(404).json("Монитор с таким ID отсутствует в БД!");
      }
      res.status(200).json("Монитор успешно удалён!");
    } catch (err) {
      res.status(500).json(`Ошибка при удалении Монитора: ${err}`);
    }
  }
}

export default new MonitorController();
