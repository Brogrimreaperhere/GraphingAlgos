import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CodeBlockProps {
  title: string
  description: string
  language: string
  code: string
}

export default function CodeBlock({ title, description, language, code }: CodeBlockProps) {
  return (
    <Card className="w-full card-hover">
      <CardHeader className="bg-gradient-to-r from-teal-light to-teal-medium rounded-t-lg">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-foreground/80">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-teal-dark text-white p-4 rounded-md overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
