export const joinUrlParameters = (searchStr: string, dict: any): string => {
  let url: string;
  let index: number;
  dict.forEach(([key, value]): void => {
    index += 1;
    const repleaceSpaceWithPlus: string = value.replace(/ /gi, '+');
    url = index < dict.size ? 
    url.concat(`${key}=${repleaceSpaceWithPlus}&`) : url.concat(`${key}=${repleaceSpaceWithPlus}`);
  });
  return searchStr + url;
};