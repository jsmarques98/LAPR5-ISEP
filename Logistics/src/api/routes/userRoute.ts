import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import { Result } from '../../core/logic/Result';

var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phoneNumber: Joi.number().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );



  route.post(
    '/ssosignin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SSOSignIn(email);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );





  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);

  route.delete('',middlewares.isAuth,
    async (req, res, next) =>{
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Delete-User endpoint with body: %o', req.body)
      try {
        const  email  = req.query.email.toString();;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.deleteUser(email);
        
        if( result.isFailure ){
        
          return res.json().status(403);

        }

        
        return res.json(1).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    } );


    route.get('/getByEmail',middlewares.isAuth,
    async (req, res, next) =>{
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Get-User-By-Email endpoint with body: %o', req.body)
      try {
        const  email  = req.query.email.toString();
        
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.getUserByEmail(email);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO } = result.getValue();
        return res.json({ userDTO }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    } );

    route.patch('',middlewares.isAuth,
  
    celebrate({
      body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        password: Joi.string(),
        phoneNumber: Joi.number(),
        email: Joi.string().required(),
        role: Joi.string()
      }),
    }),
    async (req, res, next) => {
      
      
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Get-User-By-Email endpoint with body: %o', req.body)
      try {
        const authServiceInstance = Container.get(AuthService);
        console.log("1");
        
        const userOrError = await  authServiceInstance.updateUser(req.body as IUserDTO) as Result<IUserDTO>;
        if (userOrError.isFailure) {
          return res.status(404).send();
        }
  
        const truckDTO = userOrError.getValue();
        return res.json( truckDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
    } );

};
