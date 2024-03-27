# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
## Môi trường

`Node.Js` version mới (>16)

## Cài đặt

### Cài lib

```bash
yarn install
```

### Biến môi trường

Tạo file `.env.local` ở thư mục gốc, thêm các biến môi trường cần thiết:

```bash
VITE_API_ENDPOINT=http://localhost:1234
```

VITE_API_ENDPOINT là endpoint của api-gateway
## Khởi chạy

### Chế độ dev

```bash
yarn dev
```

### Chế độ production

```bash
yarn build
```

sau đó

```
yarn start
```

## Convension

- Sử dụng absolute import path, folder `src/` sẽ thay bằng `@/` - Ví dụ:

  ```typescript
  // Import bằng relative path ❌
  import Layout from '../components/abc/xyz';

  // Import bằng absolute path ✅
  import Layout from '@/components/abc/xyz';
  ```

- Các page (trang chính), layout,... sẽ được viết trong folder `app` như document của `NextJS`, chi tiết xem tại [đây](https://nextjs.org/docs/getting-started/project-structure)

- Các **components** sử dụng chung cho toàn project thì viết trực tiếp trong `@/components...`

  > VD: component `loading-modal.tsx` dùng cho nhiều page, sẽ viết tại `@/components/loading-modal.tsx`

- Config đa ngôn ngữ (`i18n`) trong `@/i18n`, chú ý update các file ngôn ngữ đồng bộ.
- Các **hook** tự viết định nghĩa trong `@/hooks`.
- **Lint** và **format** code: được tự động fix khi chạy lệnh `git commit...`
- **Commit lint**:

  ```
  type(scope?): subject
  ```

  với:

  `type` là mộ trong những keyword dưới (tham khảo `Angular`)

  - **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - **ci**: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
  - **chore**: add something without touching production code (Eg: update npm dependencies)
  - **docs**: Documentation only changes
  - **feat**: A new feature
  - **fix**: A bug fix
  - **perf**: A code change that improves performance
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **revert**: Reverts a previous commit
  - **style**: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
  - **test**: Adding missing tests or correcting existing tests

  `scope` là _optional_, phạm vi ảnh hưởng của commit hiện tại

  `subject` là nội dung của commit

  ```bash
  # VD commit khi thêm tính năng gọi API login:
  git commit -m "feat: add call API login
  ```
