import newGuid from './guid';
import * as url from './url';
import * as fetch from './fetch';
import * as string from './string';
import moment from 'moment';

const dateFormat = (date: any) => {
  return moment(date).format('YYYY-MM-DD [at] h:mm A z');
}

const flatten = (arr: any, parentref?: any) => {
  return arr ? arr.reduce((result: any, item: any) => [
    ...result,
    {
      ...item,
      hierarchy: parentref ? [...parentref, item.name] : [item.name]
    },
    ...flatten(item.children, parentref ? [...parentref, item.name] : [item.name])
  ], []) : [];
}

const flattenChildrenRecursively = (data: any, parent?: any, childHierarchy?: any) => {
  let newData: any = [];
  if (data) {
    data.forEach((initialRow: any, parentIndex: any) => {
      let parentHierarchy: any = [];
      initialRow.hierarchy = parentHierarchy;

      if (parent) {
        initialRow.parent = parent;
        parentHierarchy = [...childHierarchy];
        initialRow.hierarchy = parentHierarchy;
      }
      parentHierarchy.push(parentIndex);

      newData.push(initialRow);
      if (initialRow.children) {
        newData = [
          ...newData,
          ...flattenChildrenRecursively(
            initialRow.children,
            initialRow,
            parentHierarchy
          ),
        ];
      }
    });
  }

  return newData;
}

const utils = {
  newGuid: newGuid,
  url: url,
  fetch: fetch,
  dateFormat: dateFormat,
  flatten: flatten,
  string: string,
  flattenChildrenRecursively: flattenChildrenRecursively
}

export default utils;
