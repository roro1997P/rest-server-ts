import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {
  try {
    const users = await User.findAll({
      order: [[ 'id', 'ASC']]
    });
    res.status(200).json({
      users
    })
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const getUser = async( req: Request, res: Response ) => {

  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user){
      return res.status(404).json({
        msg: `User with id ${id} not exists`
      });
    }
    res.status(200).json({
      user
    })
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const addUser = async ( req: Request, res: Response ) => {

  const { body } = req;

  try {
    const emailExists = await User.findOne({
      where: {
        email: body.email
      }
    });
    if(emailExists){
      return res.status(400).json({
        msg: 'No se puede crear un usuario con ese email'
      });
    }

    const user = await User.create(body);
    res.json({
      user
    })
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const updateUser = async ( req: Request, res: Response ) => {

  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id, { 
      plain: true 
    });
    if(!user){
      return res.status(404).json({
        msg: 'Usuario no encontrado'
      });
    }
    await user.update(body);
    
    res.status(200).json({
      user
    })

  } catch (error) {
    res.status(500).json({
      error
    });
  }

};

export const deleteUser = async ( req: Request, res: Response ) => {

  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if(!user || !user.getDataValue('state')){
      return res.status(404).json({
        msg: 'Usuario no encontrado'
      });
    }

    await user.update({ state: false });
    
    res.status(200).json({
      user
    })

  } catch (error) {
    res.status(500).json({
      error
    });
  }
};