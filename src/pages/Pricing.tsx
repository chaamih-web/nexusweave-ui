import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, Zap, Users, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: <Zap className="h-6 w-6" />,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for individuals and small projects",
      features: [
        "100 workflow executions/month",
        "5 active workflows",
        "Basic integrations",
        "Community support",
        "7-day execution history",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      icon: <Users className="h-6 w-6" />,
      price: { monthly: 49, annual: 39 },
      description: "For growing teams and businesses",
      features: [
        "10,000 workflow executions/month",
        "Unlimited active workflows",
        "All integrations",
        "Priority support",
        "30-day execution history",
        "Team collaboration",
        "Custom code nodes",
        "Advanced analytics",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Building2 className="h-6 w-6" />,
      price: { monthly: "Custom", annual: "Custom" },
      description: "For large organizations with custom needs",
      features: [
        "Unlimited executions",
        "Unlimited workflows",
        "All integrations + custom",
        "24/7 dedicated support",
        "Unlimited execution history",
        "Advanced team features",
        "SSO & SAML",
        "SLA guarantees",
        "On-premise deployment",
        "Custom training",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const features = [
    {
      category: "Workflow Management",
      items: [
        { name: "Active Workflows", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
        { name: "Workflow Executions", free: "100/mo", pro: "10K/mo", enterprise: "Unlimited" },
        { name: "Execution History", free: "7 days", pro: "30 days", enterprise: "Unlimited" },
      ],
    },
    {
      category: "Integrations",
      items: [
        { name: "Pre-built Integrations", free: "Basic", pro: "All", enterprise: "All + Custom" },
        { name: "Custom Code Nodes", free: "❌", pro: "✅", enterprise: "✅" },
        { name: "API Access", free: "Limited", pro: "Full", enterprise: "Full" },
      ],
    },
    {
      category: "Collaboration",
      items: [
        { name: "Team Members", free: "1", pro: "10", enterprise: "Unlimited" },
        { name: "Role Permissions", free: "❌", pro: "✅", enterprise: "✅" },
        { name: "Version Control", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
      ],
    },
    {
      category: "Support & Security",
      items: [
        { name: "Support", free: "Community", pro: "Priority", enterprise: "24/7 Dedicated" },
        { name: "SSO/SAML", free: "❌", pro: "❌", enterprise: "✅" },
        { name: "SLA", free: "❌", pro: "❌", enterprise: "99.9%" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Pricing Plans
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Simple,
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                Transparent Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={isAnnual ? "text-muted-foreground" : "font-semibold"}>
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={isAnnual ? "font-semibold" : "text-muted-foreground"}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-secondary text-secondary-foreground">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 group animate-fade-in ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105"
                    : "hover:border-primary hover:shadow-lg"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-secondary text-secondary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="bg-gradient-primary p-3 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-glow transition-all">
                    <div className="text-primary-foreground">{plan.icon}</div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      {typeof plan.price.monthly === "number" ? (
                        <>
                          <span className="text-5xl font-bold">
                            ${isAnnual ? plan.price.annual : plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold">{plan.price.monthly}</span>
                      )}
                    </div>
                    {typeof plan.price.monthly === "number" && isAnnual && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed annually (${(plan.price.annual as number) * 12}/year)
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className="w-full mb-6"
                    asChild
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12">Compare All Features</h2>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Free</th>
                      <th className="text-center p-4 font-semibold">Pro</th>
                      <th className="text-center p-4 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((category, categoryIndex) => (
                      <>
                        <tr key={`category-${categoryIndex}`} className="bg-muted/50">
                          <td colSpan={4} className="p-4 font-semibold">
                            {category.category}
                          </td>
                        </tr>
                        {category.items.map((item, itemIndex) => (
                          <tr
                            key={`item-${categoryIndex}-${itemIndex}`}
                            className="border-b border-border"
                          >
                            <td className="p-4 text-muted-foreground">{item.name}</td>
                            <td className="p-4 text-center">{item.free}</td>
                            <td className="p-4 text-center font-semibold">{item.pro}</td>
                            <td className="p-4 text-center font-semibold">{item.enterprise}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What happens if I exceed my execution limit?",
                  a: "You'll receive a notification when you reach 80% of your limit. You can either upgrade or purchase additional executions.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.",
                },
                {
                  q: "Is there a discount for non-profits?",
                  a: "Yes, we offer special pricing for non-profit organizations and educational institutions. Contact sales for details.",
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-fade-in-up">
            <Card className="border-2 border-primary bg-gradient-primary text-primary-foreground p-12">
              <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">
                Start your free trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg" asChild>
                  <Link to="/signup">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link to="/contact">Contact Sales</Link>
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
