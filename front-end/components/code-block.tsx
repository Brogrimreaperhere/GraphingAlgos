import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CodeBlockProps {
  title: string
  description: string
  language: string
  code: string
}

export default function CodeBlock({ title, description, language, code }: CodeBlockProps) {
  return (
    <Card className="w-full card-hover border-primary/20">
      <CardHeader className="gradient-bg rounded-t-lg">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
