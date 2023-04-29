import { load } from '@src/config/loader';
import config from 'config';

describe('Test config loader', () => {
  it('should load valid configurations from a test.yaml', () => {
    expect(load()).toStrictEqual({
      env: 'test',
      http: { host: '127.0.0.1', port: 10100 }
    });
  });

  it('should not override fields by env variable', () => {
    process.env.env = 'production';
    const config = load();
    expect(config.env).not.toEqual('production');
  });

  it('should throw error when config.get() throw error', () => {
    jest.spyOn(config, 'get').mockImplementationOnce(() => {
      throw new Error('');
    });
    expect(() => {
      load();
    }).toThrow();
  });
});