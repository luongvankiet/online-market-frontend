import { Route, Routes } from 'react-router-dom'
import Admin from './Layouts/Admin';
import Auth from './Layouts/Auth';
import { views, authViews } from './paths'

export const getPaths = (
  r: any,
  parentIndex: number | string = 0,
) => {

  let rs: any = [];

  r.map((item: any, index: number) => {
    let key = parentIndex.toString() + index

    if (item.action && item.element) {
      rs.push({ path: item.action });
    }

    item.children?.length && (rs = rs.concat(getPaths(item.children, key)))
    return item
  });

  return rs;
}

export const getRoutes = (
  r: any,
  parentIndex: number | string = 0,
) => {

  let rs: React.ReactNode[] = [];

  r.map((item: any, index: number) => {
    let key = parentIndex.toString() + index

    if (item.action && item.element) {
      rs.push(<Route key={key} path={item.action} element={item.element} />)
    }

    item.children?.length && (rs = rs.concat(getRoutes(item.children, key)))
    return item
  });

  return rs;
}

const RenderRouters = () => {
  return <Routes>
    <Route element={<Auth />}>
      {getRoutes(authViews)}
    </Route>
    <Route element={<Admin />}>
      {getRoutes(views)}
    </Route>
  </Routes>
}

export default RenderRouters
