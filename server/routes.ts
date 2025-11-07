import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "@shared/schema";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      
      await sendContactEmail(data);
      
      res.json({ 
        success: true, 
        message: "Thank you! We'll contact you shortly to discuss your fitness journey." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          success: false, 
          error: "Please check your form data and try again." 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        error: "Failed to send your message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
