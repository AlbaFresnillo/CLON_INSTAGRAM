// import { nanoid } from 'nanoid';
// import { path } from 'path';
// import { sharp } from 'sharp';
// import { generateError, createPathIfNotExists } from '../helpers';
import db from '../db/posts';

// Controlador para agregar un like a un post
const addLikeController = (req,res) => {
  const { post_id } = req.body;
  const user_id = req.user.id; // Suponiendo que tienes el usuario en el objeto de la solicitud
 
  const addLikeQuery = 
  `
    INSERT INTO LIKES (user_id, post_id) VALUES (?, ?)
  `;

  db.query(addLikeQuery, [user_id, post_id], (err, result) => {
    if(err) {
      console.error('Error al agregar el like:', err);
      res.status(500).json({ error: 'No se pudo agregar el like' });
      return;
    }
    res.status(200).json({ message: 'Like correctamente agregado'});
  });
};

// Controlador para quitar un like a un post
const removeLikeController = (req, res) => {
  const { post_id } = req.body;
  const user_id = req.user.id; // Suponiendo que tienes el usuario en el objeto de la solicitud

  const removeLikeQuery = `
    DELETE FROM likes WHERE user_id = ? AND post_id = ?
  `;

  db.query(removeLikeQuery, [user_id, post_id], (err, result) => {
    if (err) {
      console.error('Error al quitar el like:', err);
      res.status(500).json({ error: 'No se pudo quitar el like' });
      return;
    }
    res.status(200).json({ message: 'Like correctamente quitado' });
  });
};

export { 
  addLikeController, 
  removeLikeController 
};