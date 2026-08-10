import neo4j, { Driver, Session, Record as Neo4jRecord } from "neo4j-driver";

// Singleton Neo4j driver instance for CognoDB
let driverInstance: Driver | null = null;

export function getCognodbDriver(): Driver | null {
  const uri = process.env.COGNODB_URI;
  const username = process.env.COGNODB_USERNAME || "cognodb";
  const password = process.env.COGNODB_PASSWORD;

  if (!uri || !password) {
    // Environment variables not provided yet
    return null;
  }

  if (!driverInstance) {
    try {
      driverInstance = neo4j.driver(uri, neo4j.auth.basic(username, password), {
        maxConnectionPoolSize: 50,
        connectionTimeout: 10000, // 10 seconds
        logging: neo4j.logging.console("warn"),
      });
    } catch (error) {
      console.error("Failed to initialize CognoDB driver:", error);
      driverInstance = null;
    }
  }

  return driverInstance;
}

export interface ConnectionStatus {
  isConnected: boolean;
  uri?: string;
  error?: string;
  mode: "cognodb" | "in-memory-fallback";
}

/**
  * Tests connectivity to CognoDB instance
  */
export async function checkCognodbConnection(): Promise<ConnectionStatus> {
  const uri = process.env.COGNODB_URI;
  if (!uri || !process.env.COGNODB_PASSWORD) {
    return {
      isConnected: false,
      mode: "in-memory-fallback",
      error: "COGNODB_URI or COGNODB_PASSWORD missing in environment variables",
    };
  }

  const driver = getCognodbDriver();
  if (!driver) {
    return {
      isConnected: false,
      mode: "in-memory-fallback",
      error: "Driver could not be instantiated",
    };
  }

  let session: Session | null = null;
  try {
    session = driver.session();
    await session.run("RETURN 1 AS test");
    return {
      isConnected: true,
      uri: uri,
      mode: "cognodb",
    };
  } catch (err: any) {
    console.warn("CognoDB connection check failed:", err?.message || err);
    return {
      isConnected: false,
      uri: uri,
      mode: "in-memory-fallback",
      error: err?.message || "Could not reach CognoDB database server",
    };
  } finally {
    if (session) {
      await session.close();
    }
  }
}

/**
  * Executes a parameterized openCypher query against CognoDB.
  */
export async function runCypher<T = any>(
  cypher: string,
  params: Record<string, any> = {}
): Promise<{ records: Neo4jRecord[]; summary: any } | null> {
  const driver = getCognodbDriver();
  if (!driver) {
    return null;
  }

  let session: Session | null = null;
  try {
    session = driver.session();
    const result = await session.run(cypher, params);
    return {
      records: result.records,
      summary: result.summary,
    };
  } catch (error: any) {
    console.error("Cypher Execution Error:", error?.message || error, { query: cypher, params });
    throw error;
  } finally {
    if (session) {
      await session.close();
    }
  }
}

/**
  * Closes the Neo4j driver connection cleanly
  */
export async function closeCognodbDriver(): Promise<void> {
  if (driverInstance) {
    await driverInstance.close();
    driverInstance = null;
  }
}
