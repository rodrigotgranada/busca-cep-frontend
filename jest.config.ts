export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock de estilos
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json", // Aponta para o arquivo com suporte ao JSX
    },
  },
};
