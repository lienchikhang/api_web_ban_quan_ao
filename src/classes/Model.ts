import sequelize from "../models/connect.model.js";
import { initModels } from "../models/init-models.js";


class _Model {
    private static instance: _Model;

    private constructor() {

    }

    // phương thức static nên không cần khởi tạo class để gọi
    static getInstance() {
        if (!_Model.instance) {
            _Model.instance = new _Model();
        }

        return _Model.instance;
    }

    public init() {
        return initModels(sequelize);
    }
}

export default _Model;