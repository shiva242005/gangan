export function Footer() {
    return (
      <footer className="border-t border-border/40">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MediBook. All rights reserved. This is not real medical advice.
          </p>
        </div>
      </footer>
    );
  }
  