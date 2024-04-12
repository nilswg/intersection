import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
    shims: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: false,
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'], //
    outDir: './dist',
    dts: true,
    onSuccess: async () => {
        await import('fs').then((fs) => {
            pkg.version = versionIncrement(pkg.version);
            const distPackageJson = {
                ...pkg,
                private: undefined,
                type: undefined, // 由使用者自行定義模塊類型
                scripts: undefined,
                devDependencies: undefined,
                dependencies: {
                    'react': undefined,
                    "react-dom": undefined,
                }
            };
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
            fs.writeFileSync('dist/package.json', JSON.stringify(distPackageJson, null, 2));
            fs.writeFileSync('dist/.npmrc', 'registry=http://192.168.99.140:4873');
        });
    },
});

function versionIncrement(version: string) {
    const versionDigits = version.split('.');
    const lastDigit = versionDigits.pop();
    const newVersion = versionDigits.concat(+lastDigit! + 1 + '').join('.');
    return newVersion;
}
