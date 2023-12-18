import selectUserByIdModel from "./selectUserByIdModel.js";

const selectUserById = async (req, res, next) => {
    const id = req.params.id;

    const user = await selectUserByIdModel(id);

    if (!user) {
        return res.status(404)({
            message: 'No se encuentra el usuario',
        });
    }

    res.status(200)(user);
};

export default selectUserById;