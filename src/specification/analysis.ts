/** @format */

export class Analysis {
  protected componentOrderKeyMap: { [key: string]: any } = {};
  constructor(protected readonly parsedObj: any, protected readonly dependenciesMap: any) {}
  private getComponentOrderKeyMap(projKeys: string[]) {
    projKeys.forEach((key: string) => {
      this.componentOrderKeyMap[key] = 1;
    });
  }

  private calculateOrderNumber(componentKeys: string[]) {
    componentKeys.forEach((key: string) => {
      const dependenciesInstance = this.dependenciesMap[key];
      Object.keys(dependenciesInstance).forEach(_key => {
        if (this.componentOrderKeyMap[_key]) {
          this.componentOrderKeyMap[_key] += dependenciesInstance[_key];
        }
      });
    });
  }
  getProjectOrder() {
    const componentKeys = Object.keys(this.dependenciesMap).filter(key => key !== 'Global');
    this.getComponentOrderKeyMap(componentKeys); //
    this.calculateOrderNumber(componentKeys);
    const projectArray = Object.keys(this.componentOrderKeyMap).map(key => {
      return { name: key, order: this.componentOrderKeyMap[key] };
    });
    return projectArray
      .sort((item1, item2) => {
        return item2.order - item1.order;
      })
      .map(item => item.name);
  }
}
