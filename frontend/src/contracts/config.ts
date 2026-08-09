import { TONTINE_FACTORY_ABI, GUARANTEE_POOL_ABI, YIELD_VAULT_ABI } from "./abis";

// --- Adresses Mainnet ---
export const TONTINE_FACTORY_ADDRESS = "0xcB7cf5B877f60F0251a23b6A4436825d58BDE631" as const;
export const GUARANTEE_POOL_ADDRESS = "0x06bf7adA4aA5258b2A9737302276C461e4b7686a" as const;
export const YIELD_VAULT_ADDRESS = "0xF9a831398D081b5f8E26ae98240c0940a9b7FF05" as const;

// --- Réexportations globales pour toute l'app ---
export { TONTINE_FACTORY_ABI, GUARANTEE_POOL_ABI, YIELD_VAULT_ABI };