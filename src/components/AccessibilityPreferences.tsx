import { useCallback, useEffect, useMemo, useState } from 'react';
import { X, Type, Zap } from 'lucide-react';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import {
  DEFAULT_ACCESSIBILITY_PREFERENCES,
} from '../utils/accessibilityPreferences';

export interface AccessibilityPreferences {
  motion: boolean;
  colorIntensity: number; // 0-100
  fontStyle: 'default' | 'dyslexic';
  contrast: 'normal' | 'high';
  spacing: 'comfortable' | 'compact';
}

interface AccessibilityPreferencesDialogProps {
  onSave: (preferences: AccessibilityPreferences, options?: { persist?: boolean }) => void;
  isOpen?: boolean;
  onClose?: () => void;
  preferences?: AccessibilityPreferences;
}

export function AccessibilityPreferencesDialog({
  onSave,
  isOpen: externalIsOpen,
  onClose,
  preferences,
}: AccessibilityPreferencesDialogProps) {
  const basePreferences = useMemo(
    () => preferences ?? DEFAULT_ACCESSIBILITY_PREFERENCES,
    [preferences]
  );
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [motion, setMotion] = useState(basePreferences.motion);
  const [fontStyle, setFontStyle] = useState<'default' | 'dyslexic'>(basePreferences.fontStyle);

  useEffect(() => {
    setMotion(basePreferences.motion);
    setFontStyle(basePreferences.fontStyle);
  }, [basePreferences.motion, basePreferences.fontStyle]);

  const createPreferences = useCallback(
    (overrides: Partial<AccessibilityPreferences> = {}): AccessibilityPreferences => ({
      ...basePreferences,
      motion,
      fontStyle,
      ...overrides,
    }),
    [basePreferences, motion, fontStyle]
  );

  const previewPreferences = useCallback(
    (overrides: Partial<AccessibilityPreferences> = {}) => {
      const preview = createPreferences(overrides);
      onSave(preview);
    },
    [createPreferences, onSave]
  );

  const handleSave = () => {
    const preferences = createPreferences();

    onSave(preferences, { persist: true });

    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleUseDefaults = () => {
    setMotion(DEFAULT_ACCESSIBILITY_PREFERENCES.motion);
    setFontStyle(DEFAULT_ACCESSIBILITY_PREFERENCES.fontStyle);
    onSave(DEFAULT_ACCESSIBILITY_PREFERENCES, { persist: true });

    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (onClose && !open) {
      onClose();
    } else {
      setInternalIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 border-2"
        hideCloseButton={true}
        style={{
          background: 'linear-gradient(135deg, rgba(26, 15, 46, 0.95), rgba(42, 25, 66, 0.95))',
          backdropFilter: 'blur(20px)',
          borderColor: 'var(--psychedelic-magenta)',
          boxShadow: '0 0 60px rgba(255, 0, 255, 0.3)',
        }}
      >
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            aria-label="Close accessibility preferences"
          >
            <X size={24} color="var(--psychedelic-cyan)" />
          </button>
        </DialogClose>

        <div className="text-center mb-8">
          <DialogTitle
            className="groovy-text text-5xl md:text-6xl mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome to Anthro-Pologica
          </DialogTitle>
          <DialogDescription className="text-xl opacity-90">
            Customize your experience with quick accessibility tweaks
          </DialogDescription>
        </div>

        <div className="space-y-6">
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(26, 15, 46, 0.6)',
              border: '2px solid var(--psychedelic-magenta)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Zap size={24} color="var(--psychedelic-magenta)" className="mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-1" style={{ color: 'var(--psychedelic-magenta)' }}>
                    Animations & Motion
                  </h3>
                  <p className="text-sm opacity-70">
                    Disable animated elements and transitions if they feel distracting
                  </p>
                </div>
              </div>
              <Switch
                checked={motion}
                onCheckedChange={(checked: boolean) => {
                  setMotion(checked);
                  previewPreferences({ motion: checked });
                }}
                aria-label="Toggle motion effects"
              />
            </div>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(26, 15, 46, 0.6)',
              border: '2px solid var(--psychedelic-pink)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Type size={24} color="var(--psychedelic-pink)" className="mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-1" style={{ color: 'var(--psychedelic-pink)' }}>
                    Dyslexic-Friendly Font
                  </h3>
                  <p className="text-sm opacity-70">
                    Swap headings and body copy to OpenDyslexic for easier scanning
                  </p>
                </div>
              </div>
              <Switch
                checked={fontStyle === 'dyslexic'}
                onCheckedChange={(checked: boolean) => {
                  const nextFontStyle = checked ? 'dyslexic' : 'default';
                  setFontStyle(nextFontStyle);
                  previewPreferences({ fontStyle: nextFontStyle });
                }}
                aria-label="Toggle dyslexic-friendly font"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleSave}
            className="px-8 py-4 rounded-full groovy-text text-xl transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan))',
              color: '#000',
              border: '2px solid var(--psychedelic-magenta)',
            }}
          >
            Save Preferences
          </button>
          <button
            onClick={handleUseDefaults}
            className="px-8 py-4 rounded-full groovy-text text-xl transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(26, 15, 46, 0.8)',
              color: 'var(--psychedelic-cyan)',
              border: '2px solid var(--psychedelic-cyan)',
            }}
          >
            Use Defaults
          </button>
        </div>

        <p className="text-center text-xs opacity-60 mt-6">
          Update these settings anytime from the footer link
        </p>
      </DialogContent>
    </Dialog>
  );
}
