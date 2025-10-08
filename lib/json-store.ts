import { promises as fs } from "fs"
import path from "path"

type JsonRecord = Record<string, unknown>

const DATA_DIR = path.join(process.cwd(), "data")

async function ensureDirectoryExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // ignore
  }
}

function resolveFilePath(fileBaseName: string): string {
  const safeName = fileBaseName.endsWith(".json") ? fileBaseName : `${fileBaseName}.json`
  return path.join(DATA_DIR, safeName)
}

export async function ensureFile(fileBaseName: string, initial: unknown = []): Promise<void> {
  await ensureDirectoryExists()
  const filePath = resolveFilePath(fileBaseName)
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, JSON.stringify(initial, null, 2), "utf-8")
  }
}

export async function readJson<T = unknown>(fileBaseName: string, fallback: T): Promise<T> {
  await ensureDirectoryExists()
  const filePath = resolveFilePath(fileBaseName)
  try {
    const buf = await fs.readFile(filePath, "utf-8")
    if (!buf.trim()) return fallback
    return JSON.parse(buf) as T
  } catch {
    return fallback
  }
}

export async function writeJson<T = unknown>(fileBaseName: string, data: T): Promise<void> {
  await ensureDirectoryExists()
  const filePath = resolveFilePath(fileBaseName)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export async function appendItem<T extends JsonRecord>(fileBaseName: string, item: T): Promise<T & { id: string; createdAt: string }> {
  const list = await readJson<Array<T & { id?: string; createdAt?: string }>>(fileBaseName, [])
  const now = new Date().toISOString()
  const newItem = { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: now }
  const next = [...list, newItem]
  await writeJson(fileBaseName, next)
  return newItem
}

export async function listItems<T = unknown>(fileBaseName: string): Promise<T[]> {
  return readJson<T[]>(fileBaseName, [])
}


