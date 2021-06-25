const searchArrayObject = <T>(arr: T[], search: string) =>
  arr.filter((o) =>
    Object.values(o).some((i) => i?.toString().includes(search))
  );

export default searchArrayObject;
