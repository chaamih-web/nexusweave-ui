import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  ShoppingCart,
  Megaphone,
  HeadphonesIcon,
  FileText,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UseCases() {
  const useCases = [
    {
      icon: <Cpu className="h-8 w-8" />,
      category: "IT Operations",
      title: "Streamline Infrastructure Management",
      description:
        "Automate server provisioning, monitoring, and incident response. Keep your systems running smoothly 24/7.",
      examples: [
        "Automated server provisioning and configuration",
        "Real-time infrastructure monitoring and alerts",
        "Incident detection and auto-remediation",
        "Backup and disaster recovery automation",
      ],
      stats: { time: "70%", label: "time saved on operations" },
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      category: "Sales",
      title: "Accelerate Your Sales Pipeline",
      description:
        "Automate lead qualification, CRM updates, and follow-ups. Close deals faster with intelligent automation.",
      examples: [
        "Automated lead scoring and qualification",
        "CRM data synchronization across platforms",
        "Email outreach and follow-up sequences",
        "Deal stage progression and notifications",
      ],
      stats: { time: "50%", label: "increase in qualified leads" },
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      category: "Marketing",
      title: "Scale Your Marketing Efforts",
      description:
        "Automate campaign management, social media posting, and analytics reporting. Reach more customers efficiently.",
      examples: [
        "Multi-channel campaign orchestration",
        "Social media scheduling and posting",
        "Marketing analytics and reporting",
        "Personalized email campaigns",
      ],
      stats: { time: "3x", label: "more campaigns launched" },
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      category: "Customer Support",
      title: "Deliver Exceptional Support",
      description:
        "Automate ticket routing, response generation, and escalation. Provide faster, better customer service.",
      examples: [
        "Intelligent ticket routing and categorization",
        "Automated response suggestions",
        "SLA monitoring and escalation",
        "Customer feedback collection",
      ],
      stats: { time: "60%", label: "faster response times" },
    },
    {
      icon: <FileText className="h-8 w-8" />,
      category: "Document Operations",
      title: "Transform Document Processing",
      description:
        "Automate document extraction, processing, and distribution. Handle documents at scale with AI.",
      examples: [
        "OCR and data extraction from documents",
        "Automated document classification",
        "Contract review and approval workflows",
        "Document generation and distribution",
      ],
      stats: { time: "80%", label: "reduction in manual processing" },
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      category: "Enterprise",
      title: "Enterprise-Wide Automation",
      description:
        "Connect all your business systems. Automate complex workflows across departments and teams.",
      examples: [
        "Cross-departmental process automation",
        "ERP and business system integration",
        "Compliance and audit trail automation",
        "Executive reporting and dashboards",
      ],
      stats: { time: "40%", label: "operational cost reduction" },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Use Cases
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Automation for
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                Every Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From IT operations to sales and marketing, FlowForge powers automation across your
              entire organization. See how teams like yours are saving time and scaling faster.
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 group overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left Column - Icon & Category */}
                  <div className="md:col-span-2 bg-muted/30 p-8 flex flex-col justify-between">
                    <div>
                      <div className="bg-gradient-primary p-4 rounded-xl w-fit mb-4 group-hover:shadow-glow transition-all">
                        <div className="text-primary-foreground">{useCase.icon}</div>
                      </div>
                      <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
                        {useCase.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {useCase.title}
                      </h3>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {useCase.stats.time}
                      </div>
                      <div className="text-sm text-muted-foreground">{useCase.stats.label}</div>
                    </div>
                  </div>

                  {/* Right Column - Examples */}
                  <div className="md:col-span-3 p-8">
                    <h4 className="font-semibold mb-4 text-lg">Common Automations:</h4>
                    <ul className="space-y-3 mb-6">
                      {useCase.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="group/btn" asChild>
                      <Link to="/workflows">
                        View {useCase.category} Templates
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Industries Section */}
          <section className="mt-20 animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Leading Industries</h2>
              <p className="text-xl text-muted-foreground">
                Organizations across every sector rely on FlowForge
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Technology", "Healthcare", "Finance", "E-commerce", "Education", "Manufacturing", "Real Estate", "Retail"].map(
                (industry, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {industry}
                      </h3>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 text-center animate-fade-in-up">
            <Card className="border-2 border-primary bg-gradient-primary text-primary-foreground p-12">
              <h3 className="text-4xl font-bold mb-6">Start Automating Today</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of teams already transforming their workflows
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link to="/workflows">Browse Templates</Link>
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
