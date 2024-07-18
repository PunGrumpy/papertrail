import { motion } from 'framer-motion'

import Marquee from '../../ui/marquee'

export const SkeletonBackend: React.FC = () => {
  const files = [
    {
      name: 'server.ts',
      language: 'typescript',
      body: `import express from 'express'
  import { PrismaClient } from '@prisma/client'
  
  const app = express()
  const prisma = new PrismaClient()
  `
    },
    {
      name: 'routes.ts',
      language: 'typescript',
      body: `app.get('/api', (req, res) => {
      res.json({ message: 'Hello, world!' })
  }
  `
    },
    {
      name: 'prisma.schema',
      language: 'prisma',
      body: `model User {
      id Int @id @default(autoincrement())
      email String @unique
      name String?
  }
  `
    },
    {
      name: 'appwrite.ts',
      language: 'typescript',
      body: `import { Appwrite } from 'appwrite'
  
  const client = new Appwrite()
  client.setEndpoint('http://localhost/v1').setProject('project')
  `
    }
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative flex size-full min-h-24 flex-1 flex-row space-x-2 overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <Marquee
        pauseOnHover
        className="[--duration:30s] [mask-image:linear-gradient(to_top,transparent_1%,#000_100%)]"
      >
        {files.map((file, i) => (
          <motion.figure
            key={i}
            className="flex flex-col items-start justify-start rounded-lg border border-border bg-background p-3 transition-shadow hover:shadow-md"
            whileHover={{ scale: 1.02 }}
          >
            <figcaption className="mb-2 text-sm font-semibold text-foreground">
              {file.name}
            </figcaption>
            <pre className="w-full overflow-x-auto text-xs text-muted-foreground">
              <code lang={file.language}>{file.body}</code>
            </pre>
          </motion.figure>
        ))}
      </Marquee>
    </motion.div>
  )
}
