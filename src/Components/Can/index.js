import { connect } from 'react-redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (permissions.length === [].length) return false;
  if (roles.length === [].length) return false;

  if (checkRole && !roles.includes(checkRole)) {
    console.log(`sem role${checkRole}`);
    return false;
  }
  if (checkPermission && !permissions.includes(checkPermission)) {
    console.log(`sem permission:${checkPermission}`);
    return false;
  }
  return true;
}


const Can = ({
  children, auth, checkRole, checkPermission,
}) => (typeof children === 'function' ? children(checkAuth(auth, checkRole, checkPermission)) : checkAuth(auth, checkRole, checkPermission) && children);


const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Can);
