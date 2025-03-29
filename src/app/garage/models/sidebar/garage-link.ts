export interface GarageLink {
  path: string;
  activeStyle: string;
  activeOptions: {
    exact: boolean;
  }
  title: string;
  icon: string;
  role: string[];
}
