import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truck from './routes/truckRoute';
import section from './routes/sectionRoute';
import packaging from './routes/packagingRoute';
import planning from './routes/planningRoute';


export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	section(app);
	packaging(app);
	planning(app);
	
	
	return app
}