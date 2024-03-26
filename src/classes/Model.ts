import { initModels } from "../models/init-models.js";
import sequelize from "../models/connect.model.js";

class _Model {
    private static instance: _Model;

    private constructor() {

    }

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