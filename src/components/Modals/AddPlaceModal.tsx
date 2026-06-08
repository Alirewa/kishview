'use client';
import { MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/primitives/dialog';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function AddPlaceModal() {
  const { isAddPlaceModalOpen, closeAddPlaceModal } = useAppStore((s) => ({
    isAddPlaceModalOpen: s.isAddPlaceModalOpen,
    closeAddPlaceModal: s.closeAddPlaceModal,
  }));
  const { t, dir } = useLanguage();

  return (
    <Dialog
      open={isAddPlaceModalOpen}
      onOpenChange={(open) => !open && closeAddPlaceModal()}
    >
      <DialogContent dir={dir}>
        <DialogHeader className="mb-4">
          {/* Icon + Title row */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-2xl
                         bg-sky-500/10 dark:bg-sky-400/10 flex-shrink-0"
            >
              <MessageCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <DialogTitle className="text-zinc-900 dark:text-white">
              {t.addPlaceTitle}
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
          {t.addPlaceBody}
        </DialogDescription>

        {/* Contact chip */}
        <div
          className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl
                     bg-sky-50 dark:bg-sky-500/10
                     border border-sky-100 dark:border-sky-500/20"
        >
          <span className="text-sm font-semibold text-sky-700 dark:text-sky-400">
            {t.addPlaceContact}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
