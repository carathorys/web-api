import { ServiceLifetime } from '../parameters';
import { Service } from './service.decorator';

export default describe('ServiceDecorator', () => {
  it('should decorate class', () => {
    @Service({ lifetime: ServiceLifetime.Singleton, provideIn: 'root' })
    class MyServiceClass {}

    const x = new MyServiceClass();
    expect(x).toBeTruthy();
  });
});
