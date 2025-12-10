import { cn } from "@/lib/utils";

interface BankruptScreenProps {
  onReset: () => void;
}

export function BankruptScreen({ onReset }: BankruptScreenProps) {
  return (
    <div className="fixed inset-0 bg-background/95 flex items-center justify-center z-50 scanlines">
      <div className="text-center space-y-8 p-8 max-w-md">
        {/* Game Over text */}
        <div className="space-y-2">
          <h2 className="text-4xl font-pixel text-destructive neon-text blink">
            BANCARROTA
          </h2>
          <p className="text-xl font-pixel text-accent">GAME OVER</p>
        </div>
        
        {/* Skull ASCII art */}
        <pre className="text-primary font-mono text-xs leading-tight">
{`    ▄▄▄▄▄▄▄    
  ▄█████████▄  
 ███ ▀   ▀ ███ 
 ███   ▄   ███ 
  ▀█▄▄███▄▄█▀  
    ▀▀▀▀▀▀▀    `}
        </pre>
        
        {/* Message */}
        <div className="bg-card border-4 border-border p-4">
          <p className="text-[10px] font-pixel text-foreground leading-relaxed">
            "Se acabó la fiesta, campeón... Igual que mi matrimonio, igual que mis sueños... 
            <br/><br/>
            *hic* 
            <br/><br/>
            ...¿Otra ronda?"
          </p>
          <p className="text-[8px] font-pixel text-muted-foreground mt-2">- Papá</p>
        </div>
        
        {/* Reset button */}
        <button
          onClick={onReset}
          className={cn(
            "px-8 py-4 text-sm font-pixel border-4 uppercase tracking-wider",
            "bg-primary text-primary-foreground border-primary",
            "arcade-button pulse-glow",
            "hover:bg-primary/90 transition-all duration-200"
          )}
        >
          INSERTAR MONEDA
          <span className="block text-[8px] mt-1 text-primary-foreground/70">
            (Reiniciar con 500 monedas)
          </span>
        </button>
        
        {/* Credits */}
        <p className="text-[6px] font-pixel text-muted-foreground">
          APUESTAS DE BOXEO RETRO © 2024
        </p>
      </div>
    </div>
  );
}
