
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    //useEffect 1: giam countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    //useEffect 1: redirect khi countdown = 0
    useEffect(() => {
        if (countdown == 0)
        {
            router.push("/");
        }
    }, [countdown, router]);
    //ESLint rule (và React team) bắt buộc bạn phải thêm nó vào dependency array
    // — để đảm bảo tính an toàn & ổn định của hook

    return (
        <div>
            {/* Background Effects */}
            {/* Animated Background Elements */}

            {/* Main Content */}
                {/* Error Icon */}

                {/* Error Code */}

                {/* Description */}

                {/* Action Buttons */}

                {/* Additional Help */}

            {/* Footer */}

        </div>
    );
}
