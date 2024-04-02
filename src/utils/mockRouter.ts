import { NextRouter } from "next/router";

const HOMEPAGE_URL = "/";

const mockRouter: NextRouter = {
  basePath: "",
  pathname: HOMEPAGE_URL,
  route: HOMEPAGE_URL,
  asPath: HOMEPAGE_URL,
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
  forward: () => { }
};

export default mockRouter;