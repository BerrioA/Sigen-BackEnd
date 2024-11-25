import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  findOneByEid,
  findOneByUserId,
} from "../models/EmployeeModel.js";

// Función encargada de recibir del cuerpo los datos de información del empleados para registrar los datos
export const createEmployees = async (req, res) => {
  try {
    const { uid } = req.params;
    const { bank_id, account_number, site_id, monthly_salary } = req.body;

    const employee = await findOneByUserId(uid);
    if (employee) {
      return res
        .status(403)
        .json({ error: "Ups, empleado ya cuenta con la información cargada" });
    }

    const newEmployee = await createEmployee({
      user_id: uid,
      bank_id,
      account_number,
      site_id,
      monthly_salary,
    });

    return res.status(201).json({ ok: true, newEmployee });
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ ok: true, msg: "Register" });
};

// Función encargada de actualizar los datos de un empleado
export const updateEmployees = async (req, res) => {
  try {
    const { eid } = req.params;
    const { account_number, site_id, monthly_salary } = req.body;

    const employee = await findOneByEid(eid);
    if (!employee) {
      return res
        .status(403)
        .json({ error: `Datos del empleado no encontrados` });
    }

    await updateEmployee({
      eid,
      account_number,
      site_id,
      monthly_salary,
    });

    return res.status(200).json({
      msg: "Datos del empleado actualizados con éxito",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

//Función encargada de eliminar los datos de un empleados
export const deleteEmployees = async (req, res) => {
  try {
    const { eid } = req.params;
    const employee = await findOneByEid(eid);

    if (!employee) {
      return res
        .status(403)
        .json({ error: `Datos del empleado no encontrados` });
    }

    await deleteEmployee(eid);

    return res.status(200).json({ msg: "Empleado eliminado con exito" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Ocurrio un error al intentar eliminar el empleado" });
  }
};