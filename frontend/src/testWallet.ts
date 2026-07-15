// src/testFreighter.ts

import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

export async function testFreighter() {
  console.log(await isConnected());

  const access = await requestAccess();

  console.log(access);

  console.log(await getAddress());
}