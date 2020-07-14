import Layout from '../../../views/page/application/layout/Index';
import me from './me';
import productCategory from './productCategory';
import product from './product';
import productBatch from './productBatch';
import certification from './certification';
import growthProcess from './growthProcess';
import produceProcess from './produceProcess';
import user from './user';
import role from './role';
import enterprise from './enterprise';
import dashboard from './dashboard';


export default {
  path: 'application',
  component: Layout,
  meta: { allowAnonymous: true },
  name: 'application',
  children: [
    dashboard,
    me,
    user,
    role,
    enterprise,
    productCategory,
    product,
    productBatch,
    certification,
    growthProcess,
    produceProcess
  ]
};
